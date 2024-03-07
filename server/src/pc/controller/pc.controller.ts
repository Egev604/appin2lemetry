import { Request, Response } from 'express';

import { ICreatePC, IPC } from '../../models/Pc';
import pcService from '../service/pc.service';

class PcController {
    async listPC(req: Request, res: Response) {
        try {
            const listPc = await pcService.getAllPcsWithComponents();
            res.status(200).json({ PCs: listPc });
        } catch (err) {
            if (err instanceof Error) {
                res.status(500).json({ error: err.message });
            } else {
                res.status(500).json({ error: 'An unknown error occurred.' });
            }
        }
    }
    async deletePC(req: Request, res: Response) {
        const { id } = req.params;
        try {
            await pcService.deleteAllComponentsForPC(parseInt(id));
            await pcService.deletePCAsync(parseInt(id));
            res.status(200).json('Record successfully deleted');
        } catch (err: unknown) {
            if (err instanceof Error) {
                res.status(500).json({ error: err.message });
            } else {
                res.status(500).json({ error: 'An unknown error occurred.' });
            }
        }
    }
    async createPC(req: Request, res: Response) {
        const pc: ICreatePC = {
            Model: req.body.Model,
            Description: req.body.Description,
            Condition: req.body.Condition,
            components: req.body.components,
        };
        try {
            const newPC = await pcService.createPc(pc);
            await pcService.addComponentsForPC(newPC);
            if (newPC.ComputerID != null) {
                const Pc = await pcService.getPcByIdWithComponents(newPC.ComputerID);
                res.status(200).json({ PC: Pc });
            }
        } catch (err: unknown) {
            if (err instanceof Error) {
                res.status(500).json({ error: err.message });
            } else {
                res.status(500).json({ error: 'An unknown error occurred.' });
            }
        }
    }
    async updatePC(req: Request, res: Response) {
        const pc: IPC = {
            ComputerID: req.body.ComputerID,
            Model: req.body.Model,
            Description: req.body.Description,
            Condition: req.body.Condition,
            LikeCount: req.body.LikeCount,
            components: req.body.components,
        };
        try {
            const updatedPC = await pcService.updatePC(pc);
            res.status(200).json({ PC: updatedPC });
        } catch (err: unknown) {
            if (err instanceof Error) {
                res.status(500).json({ error: err.message });
            } else {
                res.status(500).json({ error: 'An unknown error occurred.' });
            }
        }
    }
    async getPc(req: Request, res: Response) {
        const { id } = req.params;
        try {
            const Pc = await pcService.getPcByIdWithComponents(Number(id));
            res.status(200).json({ PC: Pc });
        } catch (err) {
            if (err instanceof Error) {
                res.status(500).json({ error: err.message });
            } else {
                res.status(500).json({ error: 'An unknown error occurred.' });
            }
        }
    }
}

export default new PcController();
