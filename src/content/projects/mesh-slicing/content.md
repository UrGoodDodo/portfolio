## overview

Procedural Mesh Slicing is a **runtime destruction system** developed in *Unity*.

The main goal of the project was to create a system capable of dynamically splitting arbitrary 3D meshes while generating geometry for newly exposed surfaces.

The system was developed as part of my research into **procedural destruction and runtime geometry manipulation**.

### Main Goals

The project focused on several key goals:

- Runtime mesh slicing
- Support for repeated cuts
- Automatic generation of cut surfaces
- Correct triangle orientation
- Support for different materials

The final system consists of several interconnected stages.

---

## technical-breakdown

The slicing algorithm is divided into several stages.

### 1. Vertex Classification

Each vertex is classified relative to the cutting plane.

A vertex can belong to one of three categories:

- **Positive side**
- **Negative side**
- **On the cutting plane**

A small epsilon value is used to avoid numerical instability.

> Correct vertex classification is important because every later stage of the slicing algorithm depends on it.

The classification result can conceptually be represented as:

```text
distance > epsilon   → Positive
distance < -epsilon  → Negative
otherwise            → On Plane
```

### 2. Triangle Classification

After classifying the vertices, every triangle is analyzed.

For example:

1. All vertices above the plane → triangle belongs to the **top mesh**
2. All vertices below the plane → triangle belongs to the **bottom mesh**
3. Vertices on different sides → triangle must be **split**

Some special cases also have to be handled:

- one vertex directly on the plane;
- two vertices directly on the plane;
- degenerate intersections.

### 3. Edge Intersection

When an edge crosses the cutting plane, a new intersection point is calculated.

Instead of calculating the same intersection multiple times, the system uses an `EdgeCache`.

For example:

```csharp
if (edgeCache.TryGetValue(edge, out Vector3 point))
{
    return point;
}
```

This helps prevent **duplicate vertices** and ensures that adjacent triangles share the same intersection points.

### 4. Contour Reconstruction

Intersection edges are collected during slicing.

These edges are then connected into **closed contour loops**.

Conceptually:

```text
Intersection Points
        ↓
Contour Edges
        ↓
Closed Loops
        ↓
Cap Geometry
```

A contour represents the boundary of a newly exposed surface.

### 5. Cap Triangulation

After reconstructing the contour, the system needs to fill the resulting hole.

The contour is projected into 2D space and triangulated.

The current implementation uses an **ear-clipping algorithm**.

Important cases include:

- convex vertices;
- concave vertices;
- collinear vertices;
- triangle orientation.

---

## level-design

Although this project is primarily focused on **programming and technical art**, the resulting destruction system can also influence level design.

For example, runtime destruction could be used for:

- destructible walls;
- dynamic environmental obstacles;
- alternative player routes;
- interactive level geometry.

### Gameplay Example

Imagine a level containing two possible paths:

1. The player can use the normal corridor.
2. The player can destroy part of a wall and create an alternative route.

This means destruction can become part of the **level-design language**, rather than being purely a visual effect.

---

## challenges

Several technical challenges appeared during development.

### Repeated Slicing

One of the main requirements was allowing already sliced objects to be sliced again.

This creates additional problems:

- previously generated cap geometry must be preserved;
- new intersections may occur on old cut surfaces;
- material information must remain correct.

### Concave Contours

Simple fan triangulation works well for convex polygons but can produce invalid geometry for concave shapes.

For this reason, the project moved toward **ear clipping**.

### Collinear Vertices

Another problem occurs when several contour vertices lie almost on the same line.

These vertices can produce extremely small or degenerate triangles.

> This was one of the cases where a geometrically correct algorithm still required additional numerical robustness.

---

## results

The resulting prototype is capable of:

- dynamically splitting meshes;
- generating intersection vertices;
- reconstructing cut contours;
- generating cap geometry;
- assigning separate materials to exposed surfaces.

### Current Limitations

The project still has several areas that could be improved:

- Performance on very complex meshes
- Handling meshes with complicated internal cavities
- Multiple simultaneous destruction events
- More advanced procedural materials

### Future Work

Possible future improvements include:

1. Optimization of the slicing pipeline
2. Improved contour simplification
3. More robust triangulation
4. Procedural cut-surface materials
5. Integration with gameplay systems

---

## media-test

This section exists specifically to test Markdown media.

### Image

![Mesh slicing example](/images/mesh-slicing.gif)

### Link

The project was developed using [Unity](https://unity.com/).

### Inline Formatting

This sentence contains **bold text**, *italic text*, and `inline code`.

You can also combine formatting, such as ***bold and italic text***.