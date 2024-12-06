using IncomeTaxCalculator.Server.Models;
using IncomeTaxCalculator.Server.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace IncomeTaxCalculator.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TaxCalculatorController : ControllerBase
    {
        private readonly ITaxCalculatorService _taxCalculatorService;
        private readonly ILogger<TaxCalculatorController> _logger;

        public TaxCalculatorController(ITaxCalculatorService taxCalculatorService, ILogger<TaxCalculatorController> logger)
        {
            _taxCalculatorService = taxCalculatorService;
            _logger = logger;
        }

        [HttpPost]
        [Route("calculate")]
        public IActionResult CalculateTax([FromBody] decimal grossSalary)
        {
            if (grossSalary < 0)
            {
                _logger.LogWarning("Invalid salary input: {GrossSalary}", grossSalary);
                return BadRequest("Gross Salary must be non-negative.");
            }

            try
            {
                var tax = _taxCalculatorService.CalculateTax(grossSalary);
                var netSalary = grossSalary - tax;

                var result = new TaxCalculationResult
                {
                    GrossSalary = grossSalary,
                    Tax = tax,
                    NetSalary = netSalary
                };

                _logger.LogInformation("Tax calculated successfully for gross salary: {GrossSalary}", grossSalary);

                return Ok(result);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error calculating tax for Gross Salary: {GrossSalary}", grossSalary);
                return StatusCode(500, "An internal error occurred.");
            }
        }
    }
}
