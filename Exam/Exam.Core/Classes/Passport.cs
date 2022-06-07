using System.ComponentModel.DataAnnotations;

namespace Exam.Core.Classes;

public record Passport
(
    [Required] [StringLength(4)] string Serial,
    [Required] [StringLength(6)] string Number,
    [Required] string IssuedBy,
    [Required] DateOnly IssueDate,
    [Required] string Registration
    );