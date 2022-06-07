using Exam.Core.Classes;
using Exam.Core.Interfaces;

namespace Infrastructure.Services;

public class CriminalRecordService : ICriminalRecordService
{
    public async Task<bool> IsCriminalRecorded(Passport passport)
    {
        return passport.Number.Contains("228") || passport.Serial.Contains("1337");
    }
}