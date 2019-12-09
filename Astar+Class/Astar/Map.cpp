#include "Map.h"
#include "Default.h"

Map::Map()
{
	// 맵의 크기를 불러옴
	char csizeX[4], csizeY[4];
	GetPrivateProfileStringA("MAP", "sizeX", "", csizeX, sizeof(csizeX) - 1, "../Data/Map.txt");
	GetPrivateProfileStringA("MAP", "sizeY", "", csizeY, sizeof(csizeY) - 1, "../Data/Map.txt");
	sizeX = atoi(csizeX); sizeY = atoi(csizeY);

	// 맵 크기 할당
	map = new int*[sizeX]; // 행 할당
	for (int i = 0; i < sizeX; i++) // 열 할당
	{
		map[i] = new int[sizeY];
	}

	FILE* stream = fopen("../Data/Map.txt", "rt"); // 맵의 자료를 불러옴 0=지나갈 수 있는 곳 , 1=장애물
	for (int i = 0; i < sizeX; i++)
	{
		for (int j = 0; j < sizeY; j++)
		{
			fscanf(stream, "%d", &map[i][j]);
		}
	}
	fclose(stream);		
}

Map::~Map()
{
	delete[] map;
}

void Map::PrintMap()
{
	for (int i = 0; i < sizeX; i++)
	{
		for (int j = 0; j < sizeY; j++)
		{
			printf("%d ", map[i][j]);
		}
		printf("\n");
	}
}