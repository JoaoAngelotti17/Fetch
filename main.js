const apiUrl = 'https://663c040017145c4d8c34f839.mockapi.io/Animal';

    async function populateAnimalList() {
        try {
            const response = await fetch(apiUrl);
            const data = await response.json();

            const animalList = document.getElementById('animal-list');
            animalList.innerHTML = '';

            data.forEach(animal => {
                const listItem = document.createElement('li');
                let animalInfo = "";
                if (animal.name) {
                    animalInfo += animal.name;
                }
                if (animal.idade) {
                    animalInfo += `, ${animal.idade} anos`;
                }
                if (animal.raca) {
                    animalInfo += `, ${animal.raca}`;
                }
                if (animal.id) {
                    animalInfo = `${animal.id} - ${animalInfo}`;
                }
                listItem.textContent = animalInfo;
                animalList.appendChild(listItem);
            });
            
        } catch (error) {
            console.error('Erro ao obter os dados do backend:', error);
        }
    }

    // Função para cadastrar o animal Totó
    async function cadastrarAnimal() {
        const novoAnimal = {
            name: 'Caramelo',
            idade: 8,
            raca: 'cachorro'
        };

        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(novoAnimal)
            });

            if (response.ok) {
                console.log('Animal "Totó" cadastrado com sucesso!');
                populateAnimalList(); // Atualiza a lista após cadastrar o animal
            } else {
                console.error('Falha ao cadastrar o animal "Totó":', response.statusText);
            }
        } catch (error) {
            console.error('Erro ao cadastrar o animal "Totó":', error);
        }
    }
    
    document.getElementById('add-animal-btn').addEventListener('click', cadastrarAnimal);

    populateAnimalList();