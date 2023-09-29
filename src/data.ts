export async function fetchCategories() {
    try {
        const data = await fetch('https://api.chucknorris.io/jokes/categories').then((res) => {
            return res.json();
        })
        return data;
    } catch (error) {
        console.log(error)
    }
}

console.log(fetchCategories());