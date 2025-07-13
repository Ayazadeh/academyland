import { Expose, Transform } from 'class-transformer';
import { BaseCourseDto } from './course.dto';

export class CourseDetailDto extends BaseCourseDto {
	@Expose()
	description: string;
	@Expose()
	short_description: string;
	@Expose()
	meta_description: string;
	@Expose()
	requirements: string;

	@Expose()
	@Transform(
		({ value }) => {
			if (!value || typeof value !== 'object') return '';
			const { hours = 0, minutes = 0, seconds = 0 } = value || {};
			return hours || minutes ? `${hours} : ${minutes} : ${seconds}` : '';
		},
		{ toClassOnly: true }
	)
	courseDuration: string;

	@Expose()
	@Transform(
		({ value }) => {
			if (!value || typeof value !== 'object') return '';
			const { hours = 0 } = value || {};
			return hours > 0 ? `${hours} ساعت` : '';
		},
		{ toClassOnly: true }
	)
	computedEstimateDuration: string;

	@Expose()
	@Transform(({ value, obj }) => {
		if (!Array.isArray(value)) {
			obj.totalVideoCount = 0;
			return [];
		}
        let i = 0;
        const courseChapters = value.map((chapter) => ({
			...chapter,
			courseVideos: Array.isArray(chapter.courseVideos)
			  ? chapter.courseVideos.map((video: CourseVideo) => {
				  i++;
				  return { ...video, rowNumber: i };
				})
			  : [],
		}));
        obj.totalVideoCount = i;
        return courseChapters;
    }, { toClassOnly: true })
    courseChapters: CourseChapter[];

	@Expose()
	totalVideoCount: number = 0;
	@Expose()
	courseQuestions: CourseQuestion[];
	@Expose()
	src: string;
	@Expose()
	statusText: string;
}

export class CourseDuration {
	@Expose()
	hours: number;
	@Expose()
	minutes: number;
	@Expose()
	seconds: number;
}

export class CourseVideo {
	@Expose()
	id: number;
	@Expose()
	course_id: number;
	@Expose()
	videoTitle: string;
	@Expose()
	videoDescription?: any;
	@Expose()
	isDemo: number;
	@Expose()
	hasFile: boolean;
	@Expose()
	duration: any;
	@Expose()
	rowNumber: number;
}

export class CourseChapter {
	@Expose()
	id: number;
	@Expose()
	chapterName: string;
	@Expose()
	courseVideos: CourseVideo[];
}

export class CourseQuestion {
	@Expose()
	id: number;
	@Expose()
	question: string;
	@Expose()
	answer: string;
}
