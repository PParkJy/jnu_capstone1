#include "Default.h"
#include "Astar.h"

void main()
{	
	Astar::Coordinate A(0, 0);
	Astar::Coordinate B(5, 0);

	Astar astar(A, B);

	astar.PrintNavi();
}