#pragma once

class Map
{
public:
	int sizeX, sizeY;
	int** map;
public:
	void PrintMap();
public:
	Map();
	~Map();
};

