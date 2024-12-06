namespace IncomeTaxCalculator.Server.Models
{
    public class TaxCalculationResult
    {
        public decimal GrossSalary { get; set; }
        public decimal Tax { get; set; }
        public decimal NetSalary { get; set; }
    }
}
