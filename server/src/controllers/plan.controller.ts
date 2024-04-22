import { PlanService } from '@/services/plan.service'
import { catchAsync } from '@/utils/catch-async'
import { StatusCodes } from 'http-status-codes'
import Container from 'typedi'

export class PlanController {
  private readonly planService = Container.get(PlanService)

  getAllPlans = catchAsync(async (req, res) => {
    const data = await this.planService.getAllPlans()

    res.status(StatusCodes.OK).json({
      data,
    })
  })
}
