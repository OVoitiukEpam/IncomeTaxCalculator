using IncomeTaxCalculator.Server.Controllers;
using IncomeTaxCalculator.Server.Models;
using IncomeTaxCalculator.Server.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Moq;

namespace IncomeTaxCalculator.Server.Tests
{
    public class TaxCalculatorControllerTests
    {
        private readonly Mock<ITaxCalculatorService> _mockTaxCalculatorService;
        private readonly Mock<ILogger<TaxCalculatorController>> _mockLogger;
        private readonly TaxCalculatorController _controller;

        public TaxCalculatorControllerTests()
        {
            _mockTaxCalculatorService = new Mock<ITaxCalculatorService>();
            _mockLogger = new Mock<ILogger<TaxCalculatorController>>();
            _controller = new TaxCalculatorController(_mockTaxCalculatorService.Object, _mockLogger.Object);
        }

        [Theory]
        [InlineData(10000, 1000)]
        [InlineData(40000, 11000)]
        public async Task CalculateTax_ReturnsCorrectTax(decimal grossSalary, decimal expectedTax)
        {
            // Arrange
            _mockTaxCalculatorService
                .Setup(service => service.CalculateTax(grossSalary))
                .Returns(expectedTax);

            // Act
            var result = _controller.CalculateTax(grossSalary) as OkObjectResult;

            // Assert
            Assert.NotNull(result);
            var response = result.Value as TaxCalculationResult; // использование dynamic для упрощения доступа к свойствам
            Assert.Equal(expectedTax, response.Tax);

            _mockTaxCalculatorService.Verify(service => service.CalculateTax(grossSalary), Times.Once);
        }

        [Fact]
        public async Task CalculateTax_WithNegativeSalary_ReturnsBadRequest()
        {
            // Arrange
            decimal grossSalary = -100;  // invalid salary

            // Act
            var result = _controller.CalculateTax(grossSalary);

            // Assert
            var badRequestResult = Assert.IsType<BadRequestObjectResult>(result);
            Assert.Equal("Gross Salary must be non-negative.", badRequestResult.Value);
        }

        [Fact]
        public async Task CalculateTax_WhenServiceThrowsException_ReturnsStatusCode500()
        {
            // Arrange
            decimal grossSalary = 10000;
            _mockTaxCalculatorService.Setup(service => service.CalculateTax(grossSalary))
                                     .Throws(new Exception("Internal error"));

            // Act
            var result = _controller.CalculateTax(grossSalary);

            // Assert
            var statusCodeResult = Assert.IsType<ObjectResult>(result);
            Assert.Equal(500, statusCodeResult.StatusCode);
            Assert.Equal("An internal error occurred.", statusCodeResult.Value);
        }
    }
}