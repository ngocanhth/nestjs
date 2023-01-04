
import { IsNotEmpty } from 'class-validator';
export class UpdatePostDto {
    id: number;
    content: string;
    @IsNotEmpty()
    title: string;
}