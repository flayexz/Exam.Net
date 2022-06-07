using Exam.Core.Interfaces;
using Infrastructure.Services;
using Microsoft.Extensions.DependencyInjection;

namespace Infrastructure;

public static class InfrastructureModule
{
    public static IServiceCollection AddInfrastructureModule(this IServiceCollection services)
    {
        services.AddTransient<ICriminalRecordService, CriminalRecordService>();
        services.AddScoped<IScoreCalculatorService, ScoreCalculatorService>();
        services.AddTransient<ICreditVerifyService, CreditVerifyService>();
        return services;
    }
}