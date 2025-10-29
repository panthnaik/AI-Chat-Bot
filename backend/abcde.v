module spi_slave_top (
    input wire clk_sys,       // 100MHz clock
    input wire rst_n,         // Active-low reset

    // SPI interface
    input  wire spi_clk,
    input  wire spi_mosi,
    input  wire spi_cs_n,
    output wire spi_miso,

    // LED output
    output wire [3:0] led,

    // LCD interface
    output wire lcd_rs,
    output wire lcd_en,
    output wire [3:0] lcd_db
);

// Internal wires and registers
wire [7:0] buffer_copy [0:127];

// SPI Slave with buffer
spi_slave_buffered spi_slave_inst (
    .clk(clk_sys),
    .rst_n(rst_n),
    .spi_clk(spi_clk),
    .spi_mosi(spi_mosi),
    .spi_cs_n(spi_cs_n),
    .spi_miso(spi_miso),
    .buffer_copy(buffer_copy)
);

// Clock Divider for LCD (100MHz -> 1MHz)
reg [6:0] clk_div = 0;
reg clk_1mhz = 0;
always @(posedge clk_sys) begin
    if (clk_div == 49) begin
        clk_div <= 0;
        clk_1mhz <= ~clk_1mhz;
    end else begin
        clk_div <= clk_div + 1;
    end
end

// LCD Interface Wires
wire lcd_busy;
reg [7:0] lcd_data_in;
reg lcd_send_data;
reg lcd_clear;

lcd_interface lcd_controller (
    .clk(clk_1mhz),
    .rst(!rst_n),
    .data_in(lcd_data_in),
    .send_data(lcd_send_data),
    .clear_display(lcd_clear),
    .busy(lcd_busy),
    .rs(lcd_rs),
    .en(lcd_en),
    .data(lcd_db)
);

// LCD message buffer
reg [7:0] lcd_message [0:31];
integer i;
initial begin
    for (i = 0; i < 32; i = i + 1)
        lcd_message[i] = 8'h20; // Initialize with spaces
end

// LCD control FSM
reg [3:0] lcd_state = 0;
integer lcd_char_index = 0;
reg lcd_char_sent = 0;
localparam LCD_IDLE = 0, LCD_CLEAR = 1, LCD_SEND_CHAR = 2, LCD_WAIT_COMPLETE = 3;

always @(posedge clk_1mhz or negedge rst_n) begin
    if (!rst_n) begin
        lcd_state <= LCD_IDLE;
        lcd_char_index <= 0;
        lcd_send_data <= 0;
        lcd_clear <= 0;
        lcd_data_in <= 0;
        lcd_char_sent <= 0;
    end else begin
        lcd_send_data <= 0;
        lcd_clear <= 0;

        case (lcd_state)
            LCD_IDLE: begin
                if (buffer_copy[0] == 8'hA5) begin
                    lcd_state <= LCD_CLEAR;
                    for (i = 0; i < 32; i = i + 1) begin
                        if (i < 127 && buffer_copy[i+1] != 0)
                            lcd_message[i] <= buffer_copy[i+1];
                        else
                            lcd_message[i] <= 8'h20;
                    end
                end
            end

            LCD_CLEAR: begin
                if (!lcd_busy && !lcd_char_sent) begin
                    lcd_clear <= 1;
                    lcd_char_sent <= 1;
                end else if (!lcd_busy) begin
                    lcd_char_sent <= 0;
                    lcd_state <= LCD_SEND_CHAR;
                    lcd_char_index <= 0;
                end
            end

            LCD_SEND_CHAR: begin
                if (!lcd_busy && !lcd_char_sent) begin
                    lcd_data_in <= lcd_message[lcd_char_index];
                    lcd_send_data <= 1;
                    lcd_char_sent <= 1;
                    lcd_state <= LCD_WAIT_COMPLETE;
                end
            end

            LCD_WAIT_COMPLETE: begin
                if (!lcd_busy && lcd_char_sent) begin
                    lcd_char_sent <= 0;
                    if (lcd_char_index < 31) begin
                        lcd_char_index <= lcd_char_index + 1;
                        lcd_state <= LCD_SEND_CHAR;
                    end else begin
                        lcd_state <= LCD_IDLE;
                    end
                end
            end
        endcase
    end
end

// LED logic (example - can be enhanced)
assign led = buffer_copy[1][3:0];

endmodule
