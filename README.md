# Testing a NOC y Clean Architecture

Se aplica testing a la aplicación de NOC y Clean Architecture. 

### Para iniciar proyecto

1. Instalar las dependencias. 
```
npm install
```

2. Ejecutar la base de datos con: 
```
docker compose up -d
```
3. Ejecutar el comando para arrancar prisma:
```
npx prisma migrate dev
```
4. Arrancar la aplicación con:
```
npm run dev
```




