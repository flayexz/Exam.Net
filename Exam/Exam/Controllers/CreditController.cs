using Exam.Core.Classes;
using Exam.Core.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace Exam.Controllers;

[ApiController]
[Route("[controller]")]
public class CreditController: ControllerBase
{
    private readonly ICreditVerifyService creditVerifyService;
    
    public CreditController(ICreditVerifyService creditVerifyService)
    {
        this.creditVerifyService = creditVerifyService;
    }
    
    [HttpPost]
    public async Task<IActionResult> Credit(CreditInfo creditInfo)
    {
        var creditVerifyResult = await creditVerifyService.VerifyCreditAsync(creditInfo);
        return Ok(creditVerifyResult);
    }
}