using System.ComponentModel.DataAnnotations;

namespace Exam.Core.Classes;

public record Person
(
    [Required] FullName FullName,
    [Required] [Range(1,150)] int Age
);