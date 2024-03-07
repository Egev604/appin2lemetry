import { NextFunction, Request, Response } from 'express';

import pcService from '../service/pc.service';

class PcMiddlewares {
    async validatePcExists(req: Request, res: Response, next: NextFunction) {
        const { id } = req.params;
        const pc = await pcService.getPCByIdAsync(Number(id));
        if (pc) {
            next();
        } else {
            res.status(404).send({
                message: `Pc ${id} not found`,
            });
        }
    }
}
export default new PcMiddlewares();
