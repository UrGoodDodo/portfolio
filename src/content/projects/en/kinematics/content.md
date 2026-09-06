## overview

This project was completed as part of a kinematics laboratory assignment and focuses on the practical implementation of forward and inverse kinematics in Unity.

The project includes custom Forward Kinematics and Inverse Kinematics implementations, as well as procedural gecko animation where inverse kinematics is used to control leg placement and walking behavior.

![Overview](/images/projects/kinematics/overview.gif "default")

The main goal was to understand the principles behind kinematic chains and apply them not only in isolated demonstrations, but also in a more visual scenario with a procedurally animated character.

## technical-breakdown

### Forward Kinematics

In the first Forward Kinematics implementation, each joint rotation was defined using Euler angles. The position of each following segment was calculated from the position and orientation of the previous joint, so changing one joint affected all subsequent elements in the kinematic chain.

![Forward Kinematics](/images/projects/kinematics/forward-kinematics.gif "default")

This approach demonstrated the basic principle of forward kinematics well, but combining rotations across multiple axes exposed limitations in the chosen rotation representation. In particular, the first version used a simplified method of accumulating orientation between neighboring joints, which caused incorrect behavior in more complex three-dimensional configurations.

This required reconsidering how rotations were propagated through the chain and moving toward a more robust orientation representation.

### Inverse Kinematics

For inverse kinematics, I implemented an iterative system that changes joint orientation so that the end effector moves toward a specified target.

The solution is based on the Cyclic Coordinate Descent algorithm: joints are recalculated sequentially from the end of the chain toward its base.

At each iteration, the direction from the current joint to the end effector and the direction from the same joint to the target are calculated. These vectors are then used to determine the required rotation angle and axis, after which the rotation is applied to the joint and the chain is recalculated.

Unlike the first forward kinematics implementation, rotations here are created and propagated using quaternions. This makes it possible to handle arbitrary three-dimensional rotations more reliably without manually accumulating separate Euler components.

![Inverse Kinematics](/images/projects/kinematics/inverse-kinematics.gif "wide")

Iterations continue until the end effector is sufficiently close to the target or the configured iteration limit is reached.

The system also handles cases where the target lies outside the maximum reachable length of the kinematic chain.

### Procedural Animation

A practical application of inverse kinematics in the project was a procedurally animated gecko.

![Procedural Animation](/images/projects/kinematics/procedural-animation.gif "default")

Each leg uses its own IK chain with an individual target point. Joint positions are calculated relative to the target and a pole target, which controls the bending direction of the limb.

Each leg also has a home position relative to the character's body. As long as the leg remains close enough to its home position, it stays planted. When the body moves far enough away, a new step is triggered.

During a step, the leg does not move directly to its new position. Instead, it passes through an elevated intermediate point, producing a simple arcing trajectory. To create a more natural gait, the legs are grouped into diagonal pairs: the front-left and back-right legs move together, followed by the opposite pair.

In addition to procedural leg control, the gecko reacts to the target with head and eye movement. The head smoothly rotates toward the target within a specified angular limit, while the eyes perform an additional rotation so the character can visually track the object in front of it.

As a result, inverse kinematics, procedural foot placement, coordinated walking, and target tracking are combined into a single procedural character animation system.

### References

The procedural gecko animation was based in part on the WeaverDev procedural animation tutorial.

The tutorial was used to study the organization of limb IK and the basic principles of procedural leg movement, after which these ideas were adapted and applied in this project.

Source: https://weaverdev.io/projects/proc-anim-tutorial

### Final Result

![Final Result](/images/projects/kinematics/result.gif "wide")
