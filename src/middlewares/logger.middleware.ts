import { NestMiddleware } from '@nestjs/common';


export class LoggerMiddleware implements NestMiddleware {
    use(req: any, res: any, next: () => void) {
        console.log("First MiddleWare");
        next();
    }
}
