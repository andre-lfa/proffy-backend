import { Request, Response } from 'express';

import database from '../database/connection';
import convertHoursToMinutes from '../utils/convertHoursToMinutes';

interface ScheduleItem {
    week_day: number;
    from: string;
    to: string;
}

export default class ClassesController {
    async create(req: Request, res:Response) {
        const {
            name, 
            avatar,
            whatsapp,
            bio,
            subject,
            cost,
            schedule
        } = req.body;
    
        const trx = await database.transaction();
    
        try {
            const insertedUserId = await trx('users').insert({
                name,
                avatar,
                whatsapp,
                bio
            });
        
            const user_id = insertedUserId[0];
        
            const insertedClassId = await trx('classes').insert({
                subject,
                cost,
                user_id
            });
        
            const class_id = insertedClassId[0];
        
            const classSchedule = schedule.map((scheduleItem: ScheduleItem) => {
                return {
                    class_id,
                    week_day: scheduleItem.week_day,
                    from: convertHoursToMinutes(scheduleItem.from),
                    to: convertHoursToMinutes(scheduleItem.to),
                };
            });
        
            await trx('class_schedule').insert(classSchedule);
        
            await trx.commit();
        
            return res.json( { message: 'Class created in database!'});
        } catch (error) {
            await trx.rollback();
            return res.status(400).json({
                error: 'Unexpected error while creating new class'
            })
        }
    }
}