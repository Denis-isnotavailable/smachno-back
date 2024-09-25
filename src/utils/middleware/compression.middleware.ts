import { Injectable, NestMiddleware } from '@nestjs/common';
import * as compression from 'compression';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class CompressionMiddleware implements NestMiddleware {
 use(req: Request, res: Response, next: NextFunction) {
  compression({
   level: 6,
   filter: (req: Request, res: Response) => {
    if (req.headers['x-no-compression']) {
     return false;
    }
    return compression.filter(req, res);
   },
  })(req, res, next);
 }
}
