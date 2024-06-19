# Neno

Bem-vindo(a) ao repositório do Neno, uma aplicação de extração de áudio desenvolvida com Next.js e Node.js.

Nela, o usuário pode inserir uma URL de algum vídeo do YouTube, clicar no botão de download, e o áudio desse vídeo será salvo em sua máquina. Fácil, né?

Até agora, não consegui fazer o deploy da aplicação, pois estou enfrentando um problema desconhecido.

Abaixo está um passo a passo de como você pode rodar a aplicação na sua máquina:

Ou, se preferir, veja o tutorial no YouTube [AQUI](https://youtu.be/jeqpe-hO7gA)

## Passo a passo

1. Abra o terminal em um diretório de sua preferência, por exemplo, `clones`.

2. Execute o comando:

    ```bash
    git clone https://github.com/matheuslinkdev/neno.git
    ```

3. Navegue até o diretório "neno" que será criado após o clone e abra-o em seu editor de códigos favorito:

    ```bash
    cd neno
    code .
    ```

4. Em terminais diferentes, acesse as pastas "backend" e "neno-frontend". Para cada uma, execute `npm install` ou `yarn`, dependendo do que você preferir ou estiver utilizando:

    ```bash
    cd backend
    npm install # ou yarn
    ```

    ```bash
    cd neno-frontend
    npm install # ou yarn
    ```

5. Após isso, todas as dependências devem estar instaladas. Então, rode os scripts:

    ```bash
    # No terminal do backend
    node index.js # ou nodemon index.js
    ```

    ```bash
    # No terminal do frontend
    npm run dev
    ```

6. Acesse o endereço fornecido pelo Next.js (geralmente `http://localhost:3000`) e use o projeto.

