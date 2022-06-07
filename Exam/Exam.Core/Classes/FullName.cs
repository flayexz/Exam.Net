using System.ComponentModel.DataAnnotations;

namespace Exam.Core.Classes;

public record FullName
(
    [Required] [MaxLength(50)] string FirstName,
    [Required] [MaxLength(50)] string SecondName,
    [MaxLength(50)] string? Patronymic
);