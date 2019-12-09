#include "Default.h"
#include "Struct.h"

class Node
{
public:
	Coordinate point;
	int F, G, H; // F = 비용, G = 지난 거리, H = 남은 거리

	Coordinate end;
	Node* pParent;

public:
	Node(int _x, int _y, Node* _pParent, Coordinate _EndPoint);
	Node();
	~Node();
};

