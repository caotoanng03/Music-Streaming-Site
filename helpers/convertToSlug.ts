import unidecode from "unidecode";


export const convertToSlug = (keyword: string): string => {
    const decodedKeyword = unidecode(keyword.trim());
    
    // cao toàn -> cao-toan
    const formattedSlug: string = decodedKeyword.replace(/\s+/g, "-");

    return formattedSlug;
}