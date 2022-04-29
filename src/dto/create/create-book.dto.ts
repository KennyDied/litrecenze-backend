export class CreateBookDto {
  readonly authorId: number;
  readonly title: string;
  readonly image?: string;
  readonly description?: string;
  readonly rate?: number;
}
