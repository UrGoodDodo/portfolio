## overview

The project is a procedural destruction system developed in Unity as part of my master's thesis.

It includes polygon mesh slicing, cut-surface reconstruction, Voronoi fracturing, and procedural materials for newly exposed interior surfaces. The same geometry-processing pipeline can be used both for precomputed fracturing and for runtime execution.

![Overview](/images/projects/procedural-destruction/overview.gif "default")

At the core of the system is a reusable mesh slicing and clipping pipeline that processes polygonal geometry, reconstructs closed surfaces after cuts, and serves as the foundation for building Voronoi fragments.

## technical-breakdown

### System Overview

The system is built around a shared geometry-processing pipeline.

![Voronoi Fracturing](/images/projects/procedural-destruction/en_voronoi.svg "half")
![Mesh Slicing](/images/projects/procedural-destruction/en_meshslicing.svg "half")


Mesh slicing is used both as a standalone destruction method and as a reusable operation for constructing Voronoi cells.

The final pipeline can be applied in different ways depending on the needs of the project. Fragments can be prepared in advance or generated dynamically at runtime using the same underlying geometry-processing system.

### Mesh Slicing

The slicing pipeline begins by classifying mesh vertices relative to the cutting plane.

![Overview](/images/projects/procedural-destruction/points.gif "right")

Each vertex is assigned to one of three states:

- Positive side
- Negative side
- On the plane

After classification, the triangles of the original mesh are processed. Triangles located entirely on one side of the plane can be transferred unchanged, while intersected triangles are split and reconstructed using newly created intersection points.

As a result, two separate parts of the original mesh are formed.

#### Edge Intersection Points

When an edge intersects the cutting plane, a new vertex is created at the intersection point.

The position of this vertex is calculated by interpolation along the original edge. The same interpolation parameter is used to preserve mesh attributes, such as the UV coordinates of newly created vertices.

Intersection results are reused for shared edges so that neighboring triangles reference consistent geometry and do not create duplicate intersection points.

### Surface Reconstruction

![Surface Reconstruction](/images/projects/procedural-destruction/en_restore.svg "right")

Slicing a polygon mesh creates open boundaries because the original model represents only the exterior shell of the object.

To produce closed fragments, the system reconstructs the newly exposed surface.

Edges created while processing intersected triangles are collected and connected into contours that describe the boundaries of newly exposed regions.

The contours are validated and projected into two-dimensional space, where the resulting regions can be triangulated before the new geometry is added back to the final mesh.

#### Triangulation

Several approaches to surface triangulation were considered during development.

Simple strategies worked well for regular and convex contours but became less reliable when dealing with concave shapes, nearly collinear vertices, repeated cuts, and more complex regions.

![Triangulation](/images/projects/procedural-destruction/triangulation.webp "wide")



The final system therefore uses a more robust constrained-triangulation-based approach for reconstructing irregular cut surfaces.

#### Surface Classification

The system distinguishes between geometry inherited from the original object and geometry created during the destruction process.

Original exterior surfaces remain in the main group, while reconstructed cut surfaces are classified separately as newly exposed interior geometry.

In simplified form:

![Classification](/images/projects/procedural-destruction/en_classification.svg "default")

This separation makes it possible to keep geometry processing independent from its visual representation.

### Voronoi Fracturing

Voronoi fracturing is built on top of the same clipping pipeline used for direct slicing.

Each seed point corresponds to a future fragment. For each point, the system constructs the corresponding Voronoi cell by sequentially clipping the original mesh with bisector planes between the current seed point and neighboring points.

The process can be represented as follows:

![Fracturing](/images/projects/procedural-destruction/en_fragmentation.svg "contained")

Instead of implementing Voronoi fracturing as a completely separate geometry system, the project reuses the existing mesh-clipping mechanism: essentially the same mesh-slicing operation, but only the required side of the mesh is kept after each cut.

#### Seed Point Distribution

The placement of seed points directly affects the character of the destruction.

Points can be distributed throughout the volume of the object or concentrated around a specific area of impact.

This makes it possible to produce different destruction patterns:

- Larger and more evenly distributed fragments
- Localized destruction around the impact point

As a result, the number and placement of seed points become parameters that control the fragmentation pattern.

![Seed Points](/images/projects/procedural-destruction/seed.gif "wide")

### Optimization

Procedural fracturing can be computationally expensive, especially when a large number of Voronoi cells is involved.

To improve the system architecture, geometry processing was separated from Unity scene objects and moved into an independent data representation.

In simplified form: ![Fracturing](/images/projects/procedural-destruction/en_optimization.svg "contained")

This separation allows computational geometry operations to be performed without directly interacting with Unity components during the calculation stage.

#### Parallel Processing

Because Voronoi cells are independent of one another while they are being constructed, their generation can be performed in parallel, after which the resulting geometry is converted back into Unity Mesh objects. This approach reduces the dependency of the computational part on Unity's main pipeline and provides a more suitable foundation for resource-intensive fracturing operations.

### Results
![Results](/images/projects/procedural-destruction/fragmentation.gif "wide")
