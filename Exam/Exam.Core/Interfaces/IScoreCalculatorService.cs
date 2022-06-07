using Exam.Core.Classes;

namespace Exam.Core.Interfaces;

public interface IScoreCalculatorService
{
    public Task<int> CalculateCreditScoreAsync(CreditInfo creditInfo);
}