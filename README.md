# bookNotes
Book Notes is a webApp where the owner can track records of the books he has read using database where he can store his ratings, summary and notes of the book.
![image](https://github.com/ujjwi/bookNotes/assets/131232351/9cff212a-dc03-45bb-80b5-a5be5581bf45)

![image](https://github.com/ujjwi/bookNotes/assets/131232351/9eede5ed-ecc2-481c-8ac2-3e82e007b7ad)

![image](https://github.com/ujjwi/bookNotes/assets/131232351/e29ac8cf-e060-4d02-af14-7d3d3f7dbdef)


## Features

* A new entry can be posted with the book details which are name, ISBN number, rating, Book Summary and finally the Book notes. 
* Any past entry can be edited or deleted using the Edit and Delete buttons.
* Any past entry can be searched for using the search box at the top right corner of the website where ISBN number or title of the book should be entered.

## Technologies used

* NodeJS
* ExpressJS
* EJS
* Postgre SQL
* Bootstrap/CSS

## Getting Started

1. Clone this repository to your local machine.
2. Navigate to the project directory in your terminal.
3. Run `npm install` to install dependencies.
4. Create a `.env` file similar to the `.env.example` file and fill in the required values.
5. Set up your PostgreSQL database and update the `.env` file with your database credentials.
   You can create a table in your postgre database using the following command :
   ```
   CREATE TABLE tableName (
    id SERIAL PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    isbn VARCHAR(13) NOT NULL,
    rating SMALLINT NOT NULL,
    summary TEXT DEFAULT 'no summary provided',
    description TEXT DEFAULT 'no notes provided'
   );
   ```
7. Run `node index.js` to start the development server.
8. Open your web browser and visit `http://localhost:3000` to access the Book Notes.

## Contributions

Contributions to Book Notes are welcome! In case you have any ideas for new features, improvements, or bug fixes, please open an issue or submit a pull request.

## License

This project is licensed under the MIT License - see the `LICENSE.md` file for details

