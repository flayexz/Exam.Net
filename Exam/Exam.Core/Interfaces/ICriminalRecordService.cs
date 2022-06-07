using Exam.Core.Classes;

namespace Exam.Core.Interfaces;

public interface ICriminalRecordService
{ 
    public Task<bool> IsCriminalRecorded(Passport passport);
}