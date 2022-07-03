import {createAsyncThunk} from "@reduxjs/toolkit";
import Axios from '../api/Axios';

/** 
 * Get All GE categories information.
 * Return an array of GE.
 */
export const fetchAllGE = createAsyncThunk("features/fetchAllGE", async () => 
    Axios.get('/api/getAllGE').then(response => {
        return response.data as GEPayload[];
    }).catch(() => {
        return [] as GEPayload[];
    })
);

export const fetchGE = createAsyncThunk("features/fetchGE", async (id: string) => 
    Axios.post('/api/getGE', {id: id}).then(response => {
        return {courses: response.data as CourseType[]};
    }).catch(() => {
        return {courses: [] as CourseType[]};
    })
);

export const fetchProgramById = createAsyncThunk("features/fetchProgramById", async (id: number) => 
    Axios.post('/api/getRequirementById', {id: id})
    .then( response => {
        return {
            status: "succeeded",
            id: id,
            requirement: response.data.major.requirement as RequirementType[],
            url: response.data.major.url, // link to the requirement page of major
            courseIds: response.data.allCourseIds, 
            courses: response.data.coursesData as CourseType[],
        };
    })
    .catch(()=> {
        return {
            status: "failed",
            id: id,
            requirement: [],
            url: '',
            courseIds: [], 
            courses: [] as CourseType[],
        };
    })
); 

export const fetchProgramByFile = createAsyncThunk("features/fetchProgramByFile", async ({data}: InputFileType) => 
    Axios.post('/api/getDataByFile',{data: data})
    .then((response) => {
        const fileContent = (JSON.parse(data)).data;
        return {
            // data receive from server
            status: "succeeded",
            requirement: response.data.major[0].requirement as RequirementType[],
            url: response.data.major[0].url, 
            name: response.data.major[0].name,
            isMajor: response.data.major[0].is_major,
            courseIds: response.data.allCourseIds as string[], 
            courseData: response.data.courseData as CourseType[],

            // data from input file after checking validity in combine_models.controller
            years: fileContent.years as string[][][],
            coursesAddByStudent: fileContent.coursesAddByStudent as string[],
            geCourses: fileContent.geCourses as string[][],
        };
    })
    .catch(()=> {
        return {
            status: "failed",
            requirement: [],
            name: '',
            url: '',  
            courseIds: [], 
            courseData: [] as CourseType[],
            years: [] as string[][][],
            coursesAddByStudent:[] as string[],
            geCourses: [] as string[][],
        };
    })
); 