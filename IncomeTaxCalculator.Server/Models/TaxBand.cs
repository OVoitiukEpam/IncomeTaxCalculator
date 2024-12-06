namespace IncomeTaxCalculator.Server.Models
{
    public class TaxBand
    {
        public decimal LowerLimit { get; set; }
        public decimal? UpperLimit { get; set; }
        public decimal Rate { get; set; }
    }
}
