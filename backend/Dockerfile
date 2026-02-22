FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS base
WORKDIR /app

# ffmpeg and libgdiplus required by undercutf1
RUN apt-get update && apt-get install -y ffmpeg libgdiplus && rm -rf /var/lib/apt/lists/*

FROM --platform=$BUILDPLATFORM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /src

# Copy solution and project files first for layer caching
COPY ["Directory.Build.props", "Directory.Build.props"]
COPY ["Directory.Packages.props", "Directory.Packages.props"]
COPY ["gen/UndercutF1.Data.SourceGeneration/UndercutF1.Data.SourceGeneration.csproj", "gen/UndercutF1.Data.SourceGeneration/"]
COPY ["gen/UndercutF1.Console.SourceGeneration/UndercutF1.Console.SourceGeneration.csproj", "gen/UndercutF1.Console.SourceGeneration/"]
COPY ["UndercutF1.Data/UndercutF1.Data.csproj", "UndercutF1.Data/"]
COPY ["UndercutF1.Console/UndercutF1.Console.csproj", "UndercutF1.Console/"]
RUN dotnet restore "UndercutF1.Console/UndercutF1.Console.csproj"

COPY . .
WORKDIR "/src/UndercutF1.Console"
ARG TARGETARCH
RUN dotnet publish "UndercutF1.Console.csproj" -o /app/publish /p:PublicRelease=true /p:PublishTrimmed=false

FROM base AS final
WORKDIR /app
COPY --from=build /app/publish .

# Environment variables for Render hosting
ENV UNDERCUTF1_APIENABLED=true
ENV UNDERCUTF1_DATADIRECTORY=/data
ENV UNDERCUTF1_LOGDIRECTORY=/logs

EXPOSE 61937

# Start a live session automatically; the API runs on port 61937
ENTRYPOINT ["./undercutf1", "--with-api", "live"]
