export function fromDateDto(dto: DateDto): Date {
    return new Date(dto.seconds * 1000 + dto.nanoseconds / 1000000);
}

export function toDateDto(date: Date): DateDto {
    return {
        seconds: Math.floor(date.getTime() / 1000),
        nanoseconds: (date.getTime() % 1000) * 1000000
    };
}

export interface DateDto {

    seconds: number;

    nanoseconds: number;

}