using Exam.Core.Classes;
using Exam.Core.Interfaces;

namespace Infrastructure.Services;

public class ScoreCalculatorService : IScoreCalculatorService
{

    private readonly ICriminalRecordService criminalRecordService;

    public ScoreCalculatorService(ICriminalRecordService criminalRecordService)
    {
        this.criminalRecordService = criminalRecordService;
    }

    public async Task<int> CalculateCreditScoreAsync(CreditInfo creditInfo)
    {
        return GetScoreByAge(creditInfo.Person.Age, creditInfo.CreditAmount, creditInfo.Pledge) +
               await GetScoreByCriminalRecords(creditInfo.IsCriminalRecorded, creditInfo.Passport) +
               GetEmploymentScores(creditInfo.Employment, creditInfo.Person.Age) +
               GetScoreByCreditGoal(creditInfo.CreditGoal) +
               GetScoreByPledge(creditInfo.Pledge) +
               GetScoreByOtherCredits(creditInfo.HasAnyCredits, creditInfo.CreditGoal) +
               GetScoreByCreditAmount(creditInfo.CreditAmount);
    }

    private int GetScoreByAge(int age, int creditAmount, Pledge pledge)
    {
        return age switch
        {
            >= 21 and <= 28 => creditAmount switch
            {
                < 1000000 => 12,
                >= 1000000 and < 3000000 => 9,
                > 3000000 => 0,
                _ => 0
            },
            >= 29 and <= 59 => 14,
            >= 60 and <= 72 => pledge is Pledge.None ? 0 : 8,
            _ => 0
        };
    }

    private async Task<int> GetScoreByCriminalRecords(bool isCriminalRecorded ,Passport passport)
    {
        if (isCriminalRecorded)
        {
            var isCriminal = await criminalRecordService.IsCriminalRecorded(passport);
            if (isCriminal)
            {
                return 0;
            }
        }

        return 15;
    }

    private int GetEmploymentScores(Employment employment, int age)
    {
        return employment switch
        {
            Employment.Contract => 14,
            Employment.IndividualEntrepreneur => 12,
            Employment.Freelancer => 8,
            Employment.Pensioner => age < 70 ? 5 : 0,
            Employment.Unemployed => 0,
            _ => 0
        };
    }

    private int GetScoreByCreditGoal(CreditGoal creditGoal)
    {
        return creditGoal switch
        {
            CreditGoal.Consumer => 14,
            CreditGoal.RealEstate => 8,
            CreditGoal.OnLending => 12,
            _ => 0
        };
    }

    private int GetScoreByPledge(Pledge pledge)
    {
        return pledge switch
        {
            Pledge.None => 0,
            Pledge.OldCar => 3,
            Pledge.NewCar => 8,
            Pledge.Guarantee => 13,
            Pledge.RealEstate => 14,
            _ => 0
        };
    }

    private static int GetScoreByOtherCredits(bool hasAnyCredits, CreditGoal creditGoal)
    {
        if (hasAnyCredits)
            return 0;
        return creditGoal is CreditGoal.OnLending ? 0 : 15;
    }

    private static int GetScoreByCreditAmount(int amount)
    {
        return amount switch
        {
            <= 1000000 => 12,
            > 1000000 and <= 5_000_000 => 14,
            > 5000000 and <= 10_000_000 => 8,
            _ => 0
        };
    }
}