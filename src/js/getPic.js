import axios from "axios";

export async function getPic(name, page) {
    const url = `https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${name}&safesearch=true&per_page=40&page=${page}&key=24451823-1c74d237c0aee111026f7cb82`;
    return await axios.get(url);
}