using Exam.Core.Classes;

namespace Exam.Core.Interfaces;

public interface ICreditVerifyService
{
    public Task<CreditVerifyResult> VerifyCreditAsync(CreditInfo creditInfo);
}