using IncomeTaxCalculator.Server.Models;

namespace IncomeTaxCalculator.Server.Services
{
    public class TaxCalculatorService : ITaxCalculatorService
    {
        private readonly List<TaxBand> _taxBands;

        public TaxCalculatorService()
        {
            // Initialize tax bands as per provided data
            _taxBands = new List<TaxBand>
        {
            new TaxBand { LowerLimit = 0, UpperLimit = 5000, Rate = 0 },
            new TaxBand { LowerLimit = 5000, UpperLimit = 20000, Rate = 0.20m },
            new TaxBand { LowerLimit = 20000, UpperLimit = null, Rate = 0.40m }
        };
        }

        public decimal CalculateTax(decimal grossSalary)
        {
            decimal tax = 0;

            foreach (var band in _taxBands)
            {
                if (grossSalary > band.LowerLimit)
                {
                    var taxableIncome = Math.Min(grossSalary, band.UpperLimit ?? grossSalary) - band.LowerLimit;
                    tax += taxableIncome * band.Rate;
                }
            }

            return tax;
        }
    }
}
