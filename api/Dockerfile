FROM eclipse-temurin:21-jdk as build

WORKDIR /app

# Copiar arquivos de definição de dependências
COPY ./pom.xml ./
COPY ./mvnw ./
COPY ./.mvn ./.mvn

# Dar permissão de execução ao Maven Wrapper
RUN chmod +x ./mvnw

# Baixar dependências (em uma camada separada para aproveitar o cache)
RUN ./mvnw dependency:go-offline -B

# Copiar código fonte
COPY ./src ./src

# Compilar e empacotar o projeto
RUN ./mvnw package -DskipTests

# Imagem final otimizada
FROM eclipse-temurin:21-jre

WORKDIR /app

# Copiar o JAR compilado da etapa de build
COPY --from=build /app/target/*.jar app.jar

EXPOSE 8080

# Comando para executar a aplicação
ENTRYPOINT ["java", "-jar", "app.jar"]