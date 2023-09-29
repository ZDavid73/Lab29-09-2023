export default class AppCard extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
    }

    connectedCallback() {
        const category = this.getAttribute('category');
        if (category) {
            this.fetchJoke(category);
        }
    }

    async fetchJoke(category: string) {
        try {
            const url = `https://api.chucknorris.io/jokes/random?category=${category}`;
            const response = await fetch(url);
            const data = await response.json();
            this.render(data);
        } catch (error) {
            console.error('Error fetching joke:', error);
        }
    }

    render(jokeData: { icon_url: string, id: string, value: string }) {
        if (this.shadowRoot) {
            this.shadowRoot.innerHTML = `
                <style>
                    .card {
                        border: 1px solid #ccc;
                        padding: 10px;
                        margin: 10px;
                        display: flex;
                        align-items: center;
                    }
                    .card img {
                        width: 50px;
                        height: 50px;
                        margin-right: 10px;
                    }
                    .card p {
                        margin: 0;
                    }
                </style>
                <div class="card">
                    <img src="${jokeData.icon_url}" alt="Chuck Norris">
                    <p>${jokeData.value}</p>
                </div>
            `;
        }
    }
}

customElements.define('app-card', AppCard);




