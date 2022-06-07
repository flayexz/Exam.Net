using System.ComponentModel.DataAnnotations;

namespace Exam.Core.Classes;

public record CreditInfo
(
    [Required] Passport Passport,
    [Required] Person Person,
    [Required] CreditGoal CreditGoal,
    [Required] Pledge Pledge,
    [Required] Employment Employment,
    [Required] bool IsCriminalRecorded,
    [Required] int CreditAmount,
    [Required] bool HasAnyCredits
);