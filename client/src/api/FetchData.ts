import {createAsyncThunk} from "@reduxjs/toolkit";
import Axios from '../api/Axios';

export const fetchCourse = createAsyncThunk("features/fetchCourse", async (payload: FetchCourseType) => 
    Axios.get('/api/getCourse', { params: { id: payload.courseId } }).then(response => {
        return {
            status: "succeeded",
            course: response.data as CourseType,
            destinationId: payload.destinationId,
            destinationIndex: payload.destinationIndex,
            courseId: payload.courseId,
        };
    }).catch(() => {
        return {
            status: "failed",
            course: {} as CourseType,
            destinationId: payload.destinationId,
            destinationIndex: payload.destinationIndex,
            courseId: payload.courseId,
        };
    })
);

export const fetchAllGE = createAsyncThunk("features/fetchAllGE", async () => 
    Axios.get('/api/getAllGE').then(response => {
        return response.data as GEPayload[];
    }).catch(() => {
        return [] as GEPayload[];
    })
);

export const fetchGE = createAsyncThunk("features/fetchGE", async (id: string) => 
    Axios.post('/api/getCoursesInGE', {id: id}).then(response => {
        return {
            status: "succeeded",
            departments: response.data.departments as string[], 
            courses_in_depts: response.data.courses_in_depts as {[id:string]: string[]}
        };
    }).catch(() => {
        return {
            status: "failed",
            departments: [], 
            courses_in_depts: {} as {[id:string]: string[]}
        };
    })
);

export const fetchProgram = createAsyncThunk("features/fetchProgram", async (id: number) => 
    Axios.post('/api/getProgram', {id: id})
    .then( response => {
        return {
            status: "succeeded",
            id: id,
            requirement: response.data.program[0].requirement as RequirementType[],
            url: response.data.program[0].url, // link to the requirement page of major
            departments: response.data.departments as string[],
        };
    })
    .catch(()=> {
        return {
            status: "failed",
            id: id,
            requirement: [],
            url: '', 
            departments: [] as string[],
        };
    })
); 

export const fetchSchedule = createAsyncThunk("features/fetchSchedule", async (id: string) => 
    Axios.post('/api/getSchedule',{id: id})
    .then((response) => {
        console.log(response);
        return {
            status: "succeeded",
            selectedPrograms: response.data.selectedPrograms as ProgramOption[][],
            years: response.data.years as string[][][],
            addedCourses: response.data.addedCourses as string[],
            courses: response.data.courses as CourseType[],
        };
    })
    .catch((error)=> {
        console.log(error);
        return {
            status: "failed",
            selectedPrograms: [] as ProgramOption[][],
            courses: [] as CourseType[],
            years: [] as string[][][],
            addedCourses: [] as string[],
        };
    })
); 