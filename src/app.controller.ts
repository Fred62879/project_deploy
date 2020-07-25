import { AppService } from './app.service';
import { Controller, Get, Res, Next, Req } from '@nestjs/common';
import { join } from 'path';
import { Response, NextFunction, Request } from 'express';

@Controller("init")
export class AppController {
  constructor(private readonly appService: AppService) { }

  // @Get('*')
  // get(
  //   @Res() res: Response,
  //   @Next() next: NextFunction,
  //   @Req() req: Request,
  // ) {
  //   // here you can check if the requested path is your api endpoint, if that's the case then we have to return next()
  //   // if (req.path.includes('graphql')) {
  //   //   return next();
  //   // }
  //
  //   // change the path to the correct html page path in your project
  //   // res.sendFile(join(process.cwd(), './build/index.html'));
  //   console.log("APP::CONTROLLER");
  //   console.log(join(__dirname, '../build', 'index.html'));
  //   res.sendFile(join(__dirname, '../build', 'index.html'));
  // }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
