import { CompetencyType, EndorsementRequestType, SkillType } from "@/types";
import { PagingSchema } from "@/types/pagination";
import axios from "./axios";

export const getSkill = async (id: number) => {
    try {
        const { data } = await axios.get<SkillType>(`/api/student/skills/${id}`);
        return data;
    }
    catch (error) {
        console.error(error);
    }
}

export const getEndorsementRequestResponse = async (id: number) => {
    try {
        const res = await axios.get<EndorsementRequestType>(`/api/endorsement_request/${id}`);
        if (res?.status === 410)
            return "expired";
        return res.data;
    }
    catch (error) {
        console.error(error);
    }
}

export const getSkills = async ({ page, search, competencies, isAdded }: { page: number; search: string; competencies: string; isAdded: string; }) => {
    try {
        // Add page params and availableCompentencies to get the competencies connected to the skills
        const route = `/api/student/skills/?availableCompentencies=true&page=${page}&search=${search}&competencies=${competencies}&is_added=${isAdded}`
        const { data } = await axios.get<PagingSchema<SkillType>>(route);
        return data;
    }
    catch (error) {
        console.error(error);
    }
}

export const getCompetencies = async ({ page, search }: { page: number; search: string; }) => {
    try {
        const route = `/api/student/competencies?page=${page}&search=${search}`
        const { data } = await axios.get<PagingSchema<CompetencyType>>(route);
        return data;
    }
    catch (error) {
        console.error(error);
    }
}


