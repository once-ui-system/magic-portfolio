import { PersonalInfo } from "@/common/interface";

export function mapUserInfoToPersonalInfo(data: string[][]): PersonalInfo {
    const infoList = [
        "firstName",
        "lastName",
        "birthDate",
        "gender",
        "occupation",
        "email",
        "phone",
    ];

    const personalInfo: PersonalInfo = {
        firstName: "",
        lastName: "",
        birthDate: "",
        gender: "",
        occupation: "",
        email: "",
        phone: "",
    };

    for (const [index, row] of data.entries()) {
        const info = infoList[index];
        personalInfo[info as keyof PersonalInfo] = row[1] ?? ""; // because data is entered in 2nd row
    }
    return personalInfo;
}