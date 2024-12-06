using IncomeTaxCalculator.Server.Services;

namespace IncomeTaxCalculator.Server.Tests
{
    public class TaxCalculatorServiceTests
    {
        private readonly TaxCalculatorService _taxCalculatorService;

        public TaxCalculatorServiceTests()
        {
            _taxCalculatorService = new TaxCalculatorService();
        }

        [Theory]
        [InlineData(0, 0)]  // Test edge case at the start of tax band
        [InlineData(4500, 0)]  // Test within the first tax-free band
        [InlineData(5000, 0)]  // Boundary value for first band
        [InlineData(15000, 2000)]  // Within the second band
        [InlineData(20000, 3000)]  // Boundary value for second band
        [InlineData(25000, 5000)]  // Within the third band
        [InlineData(60000, 19000)]  // Upper test in the third band
        public void CalculateTax_ShouldCalculateCorrectTax(decimal grossSalary, decimal expectedTax)
        {
            // Act
            var tax = _taxCalculatorService.CalculateTax(grossSalary);

            // Assert
            Assert.Equal(expectedTax, tax);
        }
    }
}