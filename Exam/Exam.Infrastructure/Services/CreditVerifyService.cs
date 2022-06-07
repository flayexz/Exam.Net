using Exam.Core.Classes;
using Exam.Core.Interfaces;

namespace Infrastructure.Services;

public class CreditVerifyService : ICreditVerifyService
{

    private readonly IScoreCalculatorService scoreCalculatorService;

    public CreditVerifyService(IScoreCalculatorService scoreCalculatorService)
    {
        this.scoreCalculatorService = scoreCalculatorService;
    }

    public async Task<CreditVerifyResult> VerifyCreditAsync(CreditInfo creditInfo)
    {
        var scores = await scoreCalculatorService.CalculateCreditScoreAsync(creditInfo);
        return new CreditVerifyResult(GetPercent(scores), scores >= 80, scores);
    }

    private static double GetPercent(int scores)
    {
        return scores switch
        {
            < 80 => 0,
            < 84 => 30,
            < 88 => 26,
            < 92 => 22,
            < 96 => 19,
            < 100 => 15,
            100 => 12.5,
            _ => 0
        };
    }
    
}