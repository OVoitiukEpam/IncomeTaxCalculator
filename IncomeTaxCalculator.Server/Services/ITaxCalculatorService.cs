namespace IncomeTaxCalculator.Server.Services
{
    public interface ITaxCalculatorService
    {
        decimal CalculateTax(decimal grossSalary);
    }
}
